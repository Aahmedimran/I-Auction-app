import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAuction } from "../../store/Auction product/action";

const Conformbiddescomponent = () => {
  const { data } = useSelector((state) => state.getAuction);
  console.log(
    "🚀 ~ file: Conformbiddescomponent.jsx:9 ~ Conformbiddescomponent ~ data:",
    data
  );
  const User = localStorage.getItem("User");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuction());
  }, []); // eslint-disable-line

  return (
    <div className="actionCard">
      {data?.length ? (
        data &&
        data?.map(
          (datas, index) =>
            datas?.product?.confirmBid &&
            datas?.product?.aceaptedBid
              .map((aceaptedBid) => aceaptedBid.User)
              .includes(User) && (
              <Card
                style={{
                  width: "20rem",
                  border: "none",
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
                  <div className="desc">
                    <strong>Name:</strong> {datas.product.Name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Card.Text>
                      {datas.product.bidder.map((bidder, index) => (
                        <div key={index} className="userbid-container">
                          <input
                            type="radio"
                            name="auctionType"
                            value={bidder.bidderId}
                          />
                          <div>
                            <div>
                              <strong>bidder Name :</strong>
                              {bidder.bidderName}
                            </div>
                          </div>
                          <div>
                            <div>
                              <strong>bid price :</strong> {bidder.bidPrice}
                            </div>
                          </div>
                        </div>
                      ))}
                    </Card.Text>
                  </div>
                  <div className="button-container">
                    <Button variant="primary" onClick={() => {}}>
                      Conform bid
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )
        )
      ) : (
        <div>data Not found</div>
      )}
    </div>
  );
};

export default Conformbiddescomponent;
