export async function GET() {
  const securityTxt = `Contact: mailto:operations@servicesplus.in
Contact: https://www.servicesplus.in/contact
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: en, hi
Canonical: https://www.servicesplus.in/.well-known/security.txt
Policy: https://www.servicesplus.in/policy/privacy-policy
`;

  return new Response(securityTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'max-age=86400',
    },
  });
}

