import { Container, LoadingContainer, LoadingSpinner } from "./loader";
import { useUserAuth } from "../../context";
function LoadingAnimation() {
  const { loading } = useUserAuth();

  return (
    <>
      {loading && (
        <Container>
          <LoadingContainer>
            <LoadingSpinner />
            <div>Loading...</div>
          </LoadingContainer>
        </Container>
      )}
    </>
  );
}

export default LoadingAnimation;
