import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AddressApi from "../../api/AddressApi";
import { Address } from "../../../api/model/address";
import { User } from "../../../api/model/user";
import Login from "../shared/login";
import Navigation from "../shared/navigation";

const ProfileScreen: FunctionComponent = () => {
  const [address, setAddress] = useState<Address>();
  const [user, setUser] = useState<User>();
  const history = useHistory();

  useEffect(() => {
    const u = Login.getCurrentUser();
    setUser(u);
    const loadAddress = async () => setAddress(await AddressApi.readAddress(u?.id || -1));
    loadAddress();
  }, [setAddress]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const addr = {
      id: address?.id ?? -1,
      street: event.target.street.value === "" ? address?.street : event.target.street.value,
      city: event.target.city.value === "" ? address?.city : event.target.city.value,
      latitude: event.target.latitude.value === "" ? address?.latitude : Number(event.target.latitude.value),
      longitude: event.target.longitude.value === "" ? address?.longitude : Number(event.target.longitude.value)
    };
    await AddressApi.saveAddress(2, JSON.stringify(addr));
    //history.push(`/games`);
  };

  return (
    <>
      <Navigation title={`Profil ${user?.name}`} />
      <Container
        className={"container-fluid games-container"}
        id={"entry-header"}
        style={{ backgroundColor: "#FFCF00", height: "100%", overflowY: "auto" }}>
        <Row>
          <Col lg={12} md={12} sm={12} className={"text-center"}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formStreet">
                <Form.Control type="text" placeholder={address?.street ?? "Strasse"} name={"street"} />
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Control type="text" placeholder={address?.city ?? "Ort"} name={"city"} />
              </Form.Group>
              <Form.Group controlId="formLatitude">
                <Form.Control type="text" placeholder={address?.strLatitude ?? "Breitengrad"} name={"latitude"} />
              </Form.Group>
              <Form.Group controlId="formLongitude">
                <Form.Control type="text" placeholder={address?.strLongitude ?? "Längengrad"} name={"longitude"} />
              </Form.Group>
              <Button
                type={"submit"}
                style={{
                  marginTop: 20,
                  backgroundColor: "#232323",
                  color: "#FFCF00",
                  fontWeight: "bold",
                  width: "100%",
                  textTransform: "uppercase",
                  borderRadius: 0,
                  border: "none"
                }}>
                Speichern
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
