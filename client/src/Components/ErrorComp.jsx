import Alert from 'react-bootstrap/Alert';
function ErrorComp() {
  return (
    <Alert variant="danger">
      <Alert.Heading style={{ color: "red" }}>Oh snap! You got an error!</Alert.Heading>
      <p style={{ color: "red" }}>
        An error has occurred while processing your request. This may be due to a variety of reasons, such as network issues, server problems, or incorrect data input. We apologize for any inconvenience this may have caused. Our team is actively working to resolve the issue. Please try again later. If the problem persists, do not hesitate to contact our support team for further assistance.
      </p>
    </Alert>
  );
}


export default ErrorComp;