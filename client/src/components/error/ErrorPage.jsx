import { Link } from "react-router-dom";


const ErrorPage = () => {
  return (
    <section
      style={{
        background: "#fff",
        padding: "40px 0",
        fontFamily: "Arvo, serif",
      }}>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div
                style={{
                  backgroundImage:
                    "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "400px",
                }}>
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "80px",
                  }}>
                  404
                </h1>
              </div>

              <div
                style={{
                  marginTop: "-50px",
                }}>
                <h3
                  style={{
                    fontFamily: "Arvo, serif",
                    fontSize: "30px",
                    textAlign: "center",
                  }}>
                  Look like you're lost
                </h3>

                <p
                  style={{
                    fontFamily: "Arvo, serif",
                    fontSize: "20px",
                    textAlign: "center",
                  }}>
                  the page you are looking for not avaible!
                </p>

                <Link
                  to="/"
                  style={{
                    position: "absolute",
                    left: "46%",
                    fontFamily: "Arvo, serif",
                    color: "#fff",
                    background: "#261de4",
                    padding: "10px 20px",
                    margin: "20px 0",
                    display: "inline-block",
                    borderRadius: "5px",
                    textDecoration: "none",
                  }}>
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;



