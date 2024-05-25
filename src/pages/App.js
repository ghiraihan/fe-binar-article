import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Button, Container, Spinner, Table } from "reactstrap";

async function hitApi() {
  const response = await fetch(process.env.REACT_APP_BE_URL + '/api/article');
  const data = await response.json();
  return data;
}

function App() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function navigateTo(path) {
    navigate(path)
  }

  useEffect(function() {
    setIsLoading(true);
    hitApi()
      .then(function (data) {
       setArticle(data.kumpulanArtikel)
      })
      .catch(function (error) {
        toast.error('Terjadi kesalahan !', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
      })
      .finally(function () {
        setIsLoading(false);
      })
  }, []);

  return (
    <Container className="mt-3">
      <h3>Blog Article</h3>
      <Table
        bordered
        hover
        responsive
        size=""
        striped={!isLoading}
      >
        <thead>
          <tr>
            <th style={{ width: '10%' }}>
              id
            </th>
            <th style={{ width: '70%' }}>
              Title
            </th>
            <th>
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? 
          <tr>
            <td className="text-center" colSpan={3}>
              <Spinner
                className="m-5"
                color="primary"
              >
                Loading...
              </Spinner>
            </td>
          </tr> : 
          article.map(function(datum) {
            const nama = "!!!!"
            return (
              <tr key={datum.id}>
                <th scope="row">
                  {datum.id}
                </th>
                <td>
                  {datum.title} {nama}
                </td>
                <td className="text-center">
                  {/* <Link to={`/detail/${datum.id}`}>
                    <Button
                      outline
                    >
                      Detail
                    </Button>
                  </Link> */}
                    <Button
                      outline
                      onClick={function () {
                        navigateTo(`/detail/${datum.id}`)
                      }}
                    >
                      Detail
                    </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <Button
        className="mt-3"
        block
        color="primary"
      >
        Tambah Artikel
      </Button>
      <ToastContainer />
    </Container>
  );
}

export default App;
