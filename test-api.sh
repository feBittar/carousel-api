#!/bin/bash

# ============================================================================
# API Test Script
# Testa os endpoints principais da API
# ============================================================================

API_URL="${1:-http://localhost:3001}"

echo ""
echo "========================================"
echo "  Testing Carousel API"
echo "  URL: $API_URL"
echo "========================================"
echo ""

# ============================================================================
# Test 1: Root endpoint
# ============================================================================

echo "Test 1: Root endpoint"
echo "GET $API_URL/"
echo ""

curl -s "$API_URL/" | jq '.'

echo ""
echo "✅ Test 1 passed"
echo ""

# ============================================================================
# Test 2: Health check
# ============================================================================

echo "Test 2: Health check"
echo "GET $API_URL/api/health"
echo ""

HEALTH_RESPONSE=$(curl -s "$API_URL/api/health")
echo "$HEALTH_RESPONSE" | jq '.'

STATUS=$(echo "$HEALTH_RESPONSE" | jq -r '.status')

if [ "$STATUS" == "healthy" ]; then
  echo ""
  echo "✅ Test 2 passed - API is healthy"
else
  echo ""
  echo "❌ Test 2 failed - API is unhealthy"
  exit 1
fi

echo ""

# ============================================================================
# Test 3: Generate carousel (if request-example.json exists)
# ============================================================================

if [ -f "request-example.json" ]; then
  echo "Test 3: Generate carousel"
  echo "POST $API_URL/api/image-gen/generate-modular"
  echo ""

  GENERATE_RESPONSE=$(curl -s -X POST "$API_URL/api/image-gen/generate-modular" \
    -H "Content-Type: application/json" \
    -d @request-example.json)

  echo "$GENERATE_RESPONSE" | jq '.'

  SUCCESS=$(echo "$GENERATE_RESPONSE" | jq -r '.success')

  if [ "$SUCCESS" == "true" ]; then
    echo ""
    echo "✅ Test 3 passed - Carousel generated successfully"

    IMAGE_COUNT=$(echo "$GENERATE_RESPONSE" | jq -r '.images | length')
    echo "📸 Generated $IMAGE_COUNT images"

    FIRST_URL=$(echo "$GENERATE_RESPONSE" | jq -r '.images[0].url')
    echo "🔗 First image URL: $FIRST_URL"
  else
    echo ""
    echo "❌ Test 3 failed - Generation error"
    ERROR=$(echo "$GENERATE_RESPONSE" | jq -r '.error')
    echo "Error: $ERROR"
  fi
else
  echo "⚠️  Test 3 skipped - request-example.json not found"
fi

echo ""
echo "========================================"
echo "  All tests completed!"
echo "========================================"
echo ""
