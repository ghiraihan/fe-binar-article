import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { 
  Button, Card, 
  CardText, CardTitle, Col, 
  Container, Row, 
  Spinner
} from "reactstrap";

async function hitDetailApi(id) {
  const response = await fetch(`${process.env.REACT_APP_BE_URL}/api/article/detail/${id}`)
  const data = await response.json();
  return data;
}

function BlogDetail() {
  const [articleDetail, setArticleDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // get id from path
  const { id } = useParams();
  useEffect(function() {
    setIsLoading(true);
    hitDetailApi(id)
      .then(function (response) {
        setArticleDetail(response.data);
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
  }, [id]);

  return (
    <Container className="mt-3">
      <Card body>
        {isLoading ? 
        <div className="text-center">
          <Spinner
            className="m-5"
            color="primary"
          >
            Loading...
          </Spinner>
        </div> : 
        <CardTitle tag="h5">
          {articleDetail.title}
        </CardTitle>}
        <CardText>
          {articleDetail.body}
        </CardText>
        <Row xs={1} lg={3} hidden={isLoading}>
          <Col>
            <Link to={'/'}>
              <Button block outline className="m-1">
                Kembali
              </Button>
            </Link>
          </Col>
          <Col>
            <Button block color="primary" className="m-1">
              Update
            </Button>
          </Col>
          <Col>
            <Button block color="danger" className="m-1">
              Delete
            </Button>
          </Col>
        </Row>
      </Card>
      <ToastContainer />
    </Container>
  )
};

export default BlogDetail;