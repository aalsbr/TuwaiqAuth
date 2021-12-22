import { Link as RouterLink, useParams } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Link, Container, Typography } from "@mui/material";
// layouts
// components
import Page from "../components/Page";
import RegisterComp from "src/components/authentication/register/RegisterComp";
import { useEffect, useState } from "react";
import axios from "axios";

import Page404 from "./Page404";
import Loading from "./Loading";
import logo from "../assets/img/logo.png";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegisterPublic() {
  const [page, setPage] = useState(true);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://137.184.157.109:8080/orders/getallcompany").then((response) => {
      let obj = response.data.data.find((o) => o.company === id);
      if (obj) setPage(false);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  if (page) return <Page404 />;

  return (
    <RootStyle title="Register | TuwaiqAuth">
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              <img src={logo} width={100} height={100} />
              Register TuwaiqAuth Account
            </Typography>
          </Box>

          <RegisterComp />

          <Typography variant="subtitle2" sx={{ mt: 3, textAlign: "center" }}>
            Already have an account?&nbsp;
            <Link to={`/login/${id}`} component={RouterLink}>
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
