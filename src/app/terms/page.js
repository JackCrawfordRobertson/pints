import styles from '../styles/T&C.module.css';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for PINTS',
};

export default function TermsPage() {
  return (
    <div className={styles.scrollableContent}>
      <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', color: '#333' }}>
        <h1>Terms of Service</h1>

        <p><b>Last updated: 22 October 2024</b></p>

        <p>Welcome to PINTS! By accessing or using our website, pints.jack-robertson.co.uk, you agree to comply with the following Terms of Service.</p>

        <h2>1. Age Restriction</h2>
        <p>You must be at least 18 years of age to use our service. By using our service, you confirm that you meet this age requirement.</p>

        <h2>2. Use of the Service</h2>
        <p>You agree to use our service in compliance with applicable laws and regulations. You may not:</p>
        <ul>
          <li>Use the service for unlawful purposes</li>
          <li>Distribute malware or engage in any activity that could damage our service or infrastructure</li>
          <li>Attempt to gain unauthorized access to any part of our service</li>
        </ul>

        <h2>3. User Accounts</h2>
        <p>To access certain features, you may need to create an account. You are responsible for safeguarding your account information and agree to notify us immediately of any unauthorized access to your account.</p>

        <h2>4. Content</h2>
        <ul>
          <li><b>User Content:</b> You retain ownership of any content you post. By submitting content, you grant us a non-exclusive license to use, distribute, and display that content on our service.</li>
          <li><b>Prohibited Content:</b> You may not post content that is harmful, discriminatory, or illegal.</li>
        </ul>

        <h2>5. Limitation of Liability</h2>
        <p>We strive to provide a reliable service, but we make no guarantees regarding uptime or the availability of the website. To the extent permitted by law, PINTS will not be held liable for any indirect or incidental damages resulting from your use of the service.</p>

        <h2>6. Termination</h2>
        <p>We reserve the right to terminate or suspend your access to our service at any time, without notice, for conduct that we believe violates these Terms or is harmful to our users.</p>

        <h2>7. Changes to the Terms</h2>
        <p>We may modify these Terms from time to time. The latest version will always be available on our website, and it is your responsibility to stay informed about updates.</p>

        <p>If you have any questions or need further information about these Terms, please contact us at jack@ya-ya.co.uk.</p>
      </div>
    </div>
  );
}