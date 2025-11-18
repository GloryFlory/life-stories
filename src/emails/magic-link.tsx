import { Html, Head, Body, Container, Section, Img, Text, Link, Hr } from '@react-email/components';

interface MagicLinkEmailProps {
  url: string;
  host: string;
}

export default function MagicLinkEmail({ url, host }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src={`${host}/life-stories-logo.png`}
              width="100"
              height="100"
              alt="Life Stories"
              style={logo}
            />
          </Section>

          <Section style={content}>
            <Text style={heading}>Your Magic Link to Life Stories</Text>
            
            <Text style={paragraph}>
              Click the button below to sign in to your Life Stories account. This link will expire in 24 hours.
            </Text>

            <Section style={buttonContainer}>
              <Link href={url} style={button}>
                Sign in to Life Stories
              </Link>
            </Section>

            <Text style={paragraph}>
              Or copy and paste this URL into your browser:
            </Text>
            
            <Text style={link}>
              {url}
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              If you didn't request this email, you can safely ignore it.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#fef3c7',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '40px auto',
  padding: '20px',
  borderRadius: '12px',
  maxWidth: '560px',
};

const header = {
  textAlign: 'center' as const,
  padding: '20px 0',
};

const logo = {
  margin: '0 auto',
};

const content = {
  padding: '0 40px',
};

const heading = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#1f2937',
  textAlign: 'center' as const,
  marginTop: '30px',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#4b5563',
  marginBottom: '16px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#d97706',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
};

const link = {
  color: '#3b82f6',
  fontSize: '14px',
  wordBreak: 'break-all' as const,
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const footer = {
  color: '#9ca3af',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '32px',
};
