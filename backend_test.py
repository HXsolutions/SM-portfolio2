#!/usr/bin/env python3
"""
Portfolio API Backend Test Suite
Tests all API endpoints for the Sohaib Mushtaq Portfolio backend
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        print("❌ Frontend .env file not found")
        return None
    return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("❌ Could not get backend URL from frontend/.env")
    sys.exit(1)

API_URL = f"{BASE_URL}/api"
print(f"🔗 Testing API at: {API_URL}")

class PortfolioAPITester:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.results = []
        
    def test_endpoint(self, method, endpoint, data=None, expected_status=200, description=""):
        """Test a single API endpoint"""
        url = f"{API_URL}{endpoint}"
        
        try:
            if method.upper() == 'GET':
                response = requests.get(url, timeout=10)
            elif method.upper() == 'POST':
                response = requests.post(url, json=data, timeout=10)
            elif method.upper() == 'PUT':
                response = requests.put(url, json=data, timeout=10)
            elif method.upper() == 'DELETE':
                response = requests.delete(url, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")
                
            # Check status code
            if response.status_code == expected_status:
                self.passed += 1
                status = "✅ PASS"
                try:
                    response_data = response.json()
                    data_preview = str(response_data)[:100] + "..." if len(str(response_data)) > 100 else str(response_data)
                except:
                    data_preview = response.text[:100] + "..." if len(response.text) > 100 else response.text
            else:
                self.failed += 1
                status = "❌ FAIL"
                data_preview = f"Expected {expected_status}, got {response.status_code}"
                
            result = f"{status} {method} {endpoint} - {description}"
            if response.status_code != expected_status:
                result += f" (Status: {response.status_code})"
            
            print(result)
            self.results.append({
                'endpoint': endpoint,
                'method': method,
                'status': response.status_code,
                'expected': expected_status,
                'passed': response.status_code == expected_status,
                'description': description,
                'data_preview': data_preview
            })
            
            return response
            
        except requests.exceptions.RequestException as e:
            self.failed += 1
            result = f"❌ FAIL {method} {endpoint} - {description} (Connection Error: {str(e)})"
            print(result)
            self.results.append({
                'endpoint': endpoint,
                'method': method,
                'status': 'ERROR',
                'expected': expected_status,
                'passed': False,
                'description': description,
                'error': str(e)
            })
            return None
    
    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Portfolio API Backend Tests")
        print("=" * 60)
        
        # 1. Health Check Endpoints
        print("\n📋 Testing Health Check Endpoints:")
        self.test_endpoint('GET', '/', description="API root endpoint")
        self.test_endpoint('GET', '/health', description="Health check endpoint")
        
        # 2. Services Endpoints
        print("\n🛠️ Testing Services Endpoints:")
        services_response = self.test_endpoint('GET', '/services', description="Get all active services")
        
        # Test specific service if services exist
        if services_response and services_response.status_code == 200:
            try:
                services_data = services_response.json()
                if services_data and len(services_data) > 0:
                    service_id = services_data[0]['id']
                    self.test_endpoint('GET', f'/services/{service_id}', description="Get specific service")
                else:
                    print("⚠️  No services found to test specific service endpoint")
            except:
                print("⚠️  Could not parse services response")
        
        # 3. Portfolio Endpoints
        print("\n💼 Testing Portfolio Endpoints:")
        portfolio_response = self.test_endpoint('GET', '/portfolio', description="Get all portfolio items")
        self.test_endpoint('GET', '/portfolio?category=E-commerce', description="Filter portfolio by E-commerce category")
        self.test_endpoint('GET', '/portfolio/categories', description="Get unique portfolio categories")
        
        # Test specific portfolio item if items exist
        if portfolio_response and portfolio_response.status_code == 200:
            try:
                portfolio_data = portfolio_response.json()
                if portfolio_data and len(portfolio_data) > 0:
                    item_id = portfolio_data[0]['id']
                    self.test_endpoint('GET', f'/portfolio/{item_id}', description="Get specific portfolio item")
                else:
                    print("⚠️  No portfolio items found to test specific item endpoint")
            except:
                print("⚠️  Could not parse portfolio response")
        
        # 4. Testimonials Endpoints
        print("\n💬 Testing Testimonials Endpoints:")
        testimonials_response = self.test_endpoint('GET', '/testimonials', description="Get all testimonials")
        self.test_endpoint('GET', '/testimonials?featured_only=true', description="Get only featured testimonials")
        
        # Test specific testimonial if testimonials exist
        if testimonials_response and testimonials_response.status_code == 200:
            try:
                testimonials_data = testimonials_response.json()
                if testimonials_data and len(testimonials_data) > 0:
                    testimonial_id = testimonials_data[0]['id']
                    self.test_endpoint('GET', f'/testimonials/{testimonial_id}', description="Get specific testimonial")
                else:
                    print("⚠️  No testimonials found to test specific testimonial endpoint")
            except:
                print("⚠️  Could not parse testimonials response")
        
        # 5. Experience Endpoints
        print("\n🎯 Testing Experience Endpoints:")
        self.test_endpoint('GET', '/experience', description="Get experience items ordered by order field")
        
        # 6. Skills Endpoints
        print("\n🔧 Testing Skills Endpoints:")
        self.test_endpoint('GET', '/skills', description="Get all skills")
        self.test_endpoint('GET', '/skills/categories', description="Get unique skill categories")
        
        # 7. Stats Endpoints
        print("\n📊 Testing Stats Endpoints:")
        self.test_endpoint('GET', '/stats', description="Get current portfolio stats")
        
        # 8. Contact Form Endpoint
        print("\n📧 Testing Contact Form Endpoint:")
        contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "company": "Tech Solutions Inc",
            "service": "Web Development",
            "message": "I'm interested in your web development services. Could you please provide more information about your pricing and timeline for a medium-sized e-commerce project?"
        }
        self.test_endpoint('POST', '/contact', data=contact_data, description="Submit contact form with valid data")
        
        # Test contact form with minimal data
        minimal_contact_data = {
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "message": "Hello, I would like to discuss a potential project with you."
        }
        self.test_endpoint('POST', '/contact', data=minimal_contact_data, description="Submit contact form with minimal data")
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = self.passed + self.failed
        success_rate = (self.passed / total_tests * 100) if total_tests > 0 else 0
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {self.passed}")
        print(f"❌ Failed: {self.failed}")
        print(f"Success Rate: {success_rate:.1f}%")
        
        if self.failed > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.results:
                if not result['passed']:
                    print(f"  • {result['method']} {result['endpoint']} - {result['description']}")
                    if 'error' in result:
                        print(f"    Error: {result['error']}")
                    elif result['status'] != 'ERROR':
                        print(f"    Expected: {result['expected']}, Got: {result['status']}")
        
        print("\n🔍 DETAILED RESULTS:")
        for result in self.results:
            status_icon = "✅" if result['passed'] else "❌"
            print(f"  {status_icon} {result['method']} {result['endpoint']} - {result['description']}")
            if 'data_preview' in result and result['passed']:
                print(f"    Response: {result['data_preview']}")
        
        return self.failed == 0

def main():
    """Main test runner"""
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! The Portfolio API is working correctly.")
        sys.exit(0)
    else:
        print(f"\n⚠️  {tester.failed} test(s) failed. Please check the API implementation.")
        sys.exit(1)

if __name__ == "__main__":
    main()