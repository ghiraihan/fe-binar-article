import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Button, Container, Table } from "reactstrap";

async function hitApi() {
  const response = await fetch('http://localhost:3555/api/article');
  const data = await response.json();
  return data;
}

function App() {
  const [article, setArticle] = useState([]);

  useEffect(function() {
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
  }, []);

  return (
    <Container className="mt-3">
      <h3>Blog Article</h3>
      <Table
        bordered
        hover
        responsive
        size=""
        striped
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
          {article.map(function(datum) {
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
                  <Button
                    outline
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
