import { NextRequest, NextResponse } from 'next/server';

// CORS configuration for authentication endpoints
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // In production, replace with specific origins
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400',
};

// FedCM specific headers
export const fedcmHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Permissions-Policy': 'identity-credentials-get=(self "https://accounts.google.com")',
};

export function withCORS(response: NextResponse) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export function withFedCM(response: NextResponse) {
  Object.entries(fedcmHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export function handleCORS(request: NextRequest) {
  if (request.method === 'OPTIONS') {
    const response = NextResponse.json({}, { status: 200 });
    return withCORS(response);
  }
  return null;
}
