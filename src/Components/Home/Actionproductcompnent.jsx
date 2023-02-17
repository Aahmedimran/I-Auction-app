import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Addproduct from "./addproduct";
import { deleteAuction, getAuction } from "../../store/Auction product/action";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Actionproductcompnent.css";
import Bidmodalcomponent from "./Bidmodalcomponent";
const Actionproductcompnent = () => {
  const { data } = useSelector((state) => state.getAuction);
  console.log("🚀 ~ file: Actionproductcompnent.jsx:11 ~ Actionproductcompnent ~ data", data)
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuction());
  }, []); // eslint-disable-line
  return (
    <div>
      <Addproduct />

      <div className="actionCard">
        {data?.length ? 
        data &&
          data?.map(
            (datas, index) =>
              datas?.product?.type.includes("Currunt auction") && (
                <Card
                  style={{
                    width: "18rem",
                    border: "none",
                    height: "55vh",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                  }}
                  key={index}
                  className=" mt-3 "
                >
                  <Card.Img
                    variant="top"
                    src={datas.product.file}
                    width={171}
                    height={180}
                  />
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Card.Title>Name : {datas?.product?.Name}</Card.Title>
                      </div>
                      <div>
                        <Card.Title>
                          Price : {datas?.product?.price}/Rs
                        </Card.Title>
                      </div>
                    </div>
                    <Card.Text className="discription">
                      <strong>Discription :</strong> {datas?.product?.discription}
                    </Card.Text>
                    <div className="button-container">
                     { datas?.product?.userId === localStorage.getItem("User") ?
                      <Button variant="primary" onClick={()=>{dispatch(deleteAuction(datas?.id));}}> Deleate Auction</Button>
                      :
                      <Bidmodalcomponent
                        id={datas?.id}
                        Name={datas?.product?.Name}
                        price={datas?.product?.price}
                        discription={datas?.product?.discription}
                        file={datas?.product?.file}
                        type={datas?.product?.type}
                      />
                    }
                    </div>
                  </Card.Body>
                </Card>
              )
          )
        :
        <div>Auction Not found</div>
        }
      </div>
    </div>
  );
};

export default Actionproductcompnent;
