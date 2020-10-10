import { Button,  Form } from "react-bootstrap";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import { useHistory } from "react-router-dom";
import AddressApi from "../../api/AddressApi";
import { Address } from "../../../api/model/address";

type ProfileParams = {
  id: string;
};

type ProfileProps = RouteComponentProps<ProfileParams>;

const ProfileScreen: FunctionComponent<ProfileProps> = ({ match }) => {
  const [address, setAddress] = useState<Address>();
  const history = useHistory();

  useEffect(() => {
    let userId = match.params.id;
    userId = '2';
    const loadGame = async () => {
      const address = await AddressApi.readAddress(userId);
      setAddress(address);
    };
    loadGame();
  }, [setAddress, match.params.id]);
  
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const saveAddress = {
      id: address?.id ?? -1,
      street: event.target.street.value === "" ? address?.street : event.target.street.value,
      city: event.target.city.value === "" ? address?.city : event.target.city.value,
      latitude:event.target.latitude.value === "" ? address?.latitude : Number(event.target.latitude.value),
      longitude: event.target.longitude.value === "" ? address?.longitude : Number(event.target.longitude.value),
      userId: 2
    };
    await AddressApi.saveAddress(saveAddress);
    //history.push(`/games`);
  };

  return (
    <Container
      id={"entry-header"}
      className={"container-fluid login-container"}
      style={{ backgroundColor: "#FFCF00", height: "100%" }}>
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
  );
};

export default ProfileScreen;