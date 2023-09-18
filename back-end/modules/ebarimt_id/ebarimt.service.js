const db_sc = require("../../db/db_sc");
const axios = require("axios");

async function getTokenEbarimt(req, res) {
  const { client_id, grant_type, username, password } = req.query;
  const formData = {
    client_id: client_id,
    grant_type: grant_type,
    username: username,
    password: password,
  };
  const formBody = new URLSearchParams(formData).toString();
  const response = await axios.post(
    "https://auth.itc.gov.mn/auth/realms/ITC/protocol/openid-connect/token",
    formBody,
    {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  );
  return response.data;
}

async function getRegUserEbarimt(req, res) {
  const { regNo } = req.query;
  const url = `https://service.itc.gov.mn/api/easy-register/api/info/consumer/${regNo}`;
  const response = await axios.get(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1OFJjdFJOVUZ5X0h6NllyaFAtYTdfY08taTI1SFVuTTNGWnpsWWdJa0lnIn0.eyJleHAiOjE2OTUwMDY3MjksImlhdCI6MTY5NTAwMzEyOSwianRpIjoiOWI4NmQ3MDMtOGQ3Ni00MzMzLThhMDEtZTYxMDM0ZjJlNTJlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLml0Yy5nb3YubW4vYXV0aC9yZWFsbXMvSVRDIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImRlMzcyMTJlLTgwNjAtNDFjMC05YmQwLTE0MGUwNzliN2FjNSIsInR5cCI6IkJlYXJlciIsImF6cCI6InZhdHBzIiwic2Vzc2lvbl9zdGF0ZSI6ImZiOWViNjUwLTNkZmItNGY0OS1iNTljLTRjNzVlODY5MDFiMCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1pdGMiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsidmF0cHMiOnsicm9sZXMiOlsiRUFTWS1SRUdJU1RFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZmI5ZWI2NTAtM2RmYi00ZjQ5LWI1OWMtNGM3NWU4NjkwMWIwIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJlci0yMDczOTQzIiwiZW1haWwiOiJhemFhQG10Y29uZS5uZXQifQ.q5F2Y7cdT7jeHI6QzwtdUHtZiIUyYZsOlejZ-PTVg7NzwqiY-8cR1xs4lLa-viwLXplNfNhZz9g0Y-Tt0QmfquKAiIowXVSRZ1jRyg1sACeawoA8I0xlusOVfuSUSoe_7gv-0AMhS57smuC2kebd-00KtON-HtVTA-OO75eJhtYl_y0bkXG0rnGfvvOwNxlX6xTCl4FZCwzEpwTDBc9tgesn_bqceyrKClImSPHB9XGjLdDRfL7V4o0cMPKn8aN5AFoGV2zPmZ8upF3YAGgFCMbgo36-egAUoRN8J6bN4ReR0vt69HeqMpZvqLdP4Tq1EQ9Oyy1GhHfEiFPI_BH9Kw",
    },
  });
  return response.data;
}

async function getCusUserEbarimt(req, res) {
  let data = JSON.stringify(req.query);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://service.itc.gov.mn/api/easy-register/rest/v1/getProfile",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1OFJjdFJOVUZ5X0h6NllyaFAtYTdfY08taTI1SFVuTTNGWnpsWWdJa0lnIn0.eyJleHAiOjE2OTUwMTA3NzEsImlhdCI6MTY5NTAwNzE3MSwianRpIjoiODQ2ZTFmYTktZDUzMC00NTkzLTlhODYtNGZlMGIxMjVkZGIwIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLml0Yy5nb3YubW4vYXV0aC9yZWFsbXMvSVRDIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImRlMzcyMTJlLTgwNjAtNDFjMC05YmQwLTE0MGUwNzliN2FjNSIsInR5cCI6IkJlYXJlciIsImF6cCI6InZhdHBzIiwic2Vzc2lvbl9zdGF0ZSI6ImVmZTQxNmQ0LTUzYTQtNGQ5YS1iZDgzLTcxZWNiYWM5ZWVlNiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1pdGMiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsidmF0cHMiOnsicm9sZXMiOlsiRUFTWS1SRUdJU1RFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZWZlNDE2ZDQtNTNhNC00ZDlhLWJkODMtNzFlY2JhYzllZWU2IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJlci0yMDczOTQzIiwiZW1haWwiOiJhemFhQG10Y29uZS5uZXQifQ.QFTHNYOmzlONTZ0qVn0JwKeGTbD6vbzQZwk_Z--HVR3w0SCcnLCf4SUQFp8EC8BBRfh2oxi7ML7n1OC9Npy7itSs_RX83lMkLfCSabvAGOTISWoavzTkym8-E43HFVTj3D1D0Ty0JJ0Jw-jNnj2o2p0sFzfO79J-w3Vd81r1uO9uy7KTIJuyALr4NLLZiOZQz0_SvpWty6ztEye8unc7MhBQfgvJTlryoVXrF8SFvvenehtjLaRsaHc6ncCSwFiwMidhc8nz5pv8Kb-y4f-K5gCC4P2Vx3tiJ42qwf8Mrg6_7hy8PjJYER4Z_4XKSllbI-U2TRU2RsbBRZZk_Mf5Wg",
      Cookie: "JSESSIONID=7twxo2rMrcFlk4zU-7zA9Nvm6yb4b_1pd1Ol8O3n",
    },
    data: data,
  };
  const response = await axios.request(config);
  return response.data;
}

async function getSubsEbarimt(req, res) {
  let data = JSON.stringify(req.query);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://service.itc.gov.mn/api/easy-register/rest/v1/approveQr",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1OFJjdFJOVUZ5X0h6NllyaFAtYTdfY08taTI1SFVuTTNGWnpsWWdJa0lnIn0.eyJleHAiOjE2OTUwMTA3NzEsImlhdCI6MTY5NTAwNzE3MSwianRpIjoiODQ2ZTFmYTktZDUzMC00NTkzLTlhODYtNGZlMGIxMjVkZGIwIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLml0Yy5nb3YubW4vYXV0aC9yZWFsbXMvSVRDIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImRlMzcyMTJlLTgwNjAtNDFjMC05YmQwLTE0MGUwNzliN2FjNSIsInR5cCI6IkJlYXJlciIsImF6cCI6InZhdHBzIiwic2Vzc2lvbl9zdGF0ZSI6ImVmZTQxNmQ0LTUzYTQtNGQ5YS1iZDgzLTcxZWNiYWM5ZWVlNiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1pdGMiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsidmF0cHMiOnsicm9sZXMiOlsiRUFTWS1SRUdJU1RFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZWZlNDE2ZDQtNTNhNC00ZDlhLWJkODMtNzFlY2JhYzllZWU2IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJlci0yMDczOTQzIiwiZW1haWwiOiJhemFhQG10Y29uZS5uZXQifQ.QFTHNYOmzlONTZ0qVn0JwKeGTbD6vbzQZwk_Z--HVR3w0SCcnLCf4SUQFp8EC8BBRfh2oxi7ML7n1OC9Npy7itSs_RX83lMkLfCSabvAGOTISWoavzTkym8-E43HFVTj3D1D0Ty0JJ0Jw-jNnj2o2p0sFzfO79J-w3Vd81r1uO9uy7KTIJuyALr4NLLZiOZQz0_SvpWty6ztEye8unc7MhBQfgvJTlryoVXrF8SFvvenehtjLaRsaHc6ncCSwFiwMidhc8nz5pv8Kb-y4f-K5gCC4P2Vx3tiJ42qwf8Mrg6_7hy8PjJYER4Z_4XKSllbI-U2TRU2RsbBRZZk_Mf5Wg",
      Cookie: "JSESSIONID=7twxo2rMrcFlk4zU-7zA9Nvm6yb4b_1pd1Ol8O3n",
    },
    data: data,
  };
  const response = await axios.request(config);
  return response.data;
}
async function getAllEbarimt(req, res) {
  console.log("ji");
}

module.exports = {
  getTokenEbarimt,
  getRegUserEbarimt,
  getCusUserEbarimt,
  getSubsEbarimt,
  getAllEbarimt,
};
