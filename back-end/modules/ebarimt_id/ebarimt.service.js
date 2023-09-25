const oracle_db = require("../../db/db_oracle");
const axios = require("axios");

async function getAllEbarimt(req, res) {
  const { page, limit, begin, end, mobile, regno, ebarimt_id, cust_id } =
    req.query;
  let totalDatas;
  // let query = "SELECT * FROM mtc_sc_ebarimt_id WHERE ebarimt_id IS NOT NULL";
  let query = `SELECT mtc_sc_ebarimt_id.id, mtc_sc_ebarimt_id.cust_id, ut_sb_customer.cust_name, mtc_sc_ebarimt_id.regno, mtc_sc_ebarimt_id.ebarimt_id, mtc_sc_ebarimt_id.created_at, mtc_sc_ebarimt_id.updated_at,
  mtc_sc_ebarimt_id.id_check, mtc_sc_ebarimt_id.staff_id, mtc_sc_ebarimt_id.mobile, mtc_sc_ebarimt_id.edit_check
  FROM ut_sb_customer 
  INNER JOIN mtc_sc_ebarimt_id 
  ON ut_sb_customer.CUST_ID = mtc_sc_ebarimt_id.CUST_ID 
  WHERE mtc_sc_ebarimt_id.ebarimt_id IS NOT NULL
  `;
  const params = [];
  if (mobile) {
    query += " AND MOBILE LIKE :mobilePattern";
    const mobilePattern = `%${mobile}%`;
    params.push(mobilePattern);
  }
  if (regno) {
    query += " AND REGNO LIKE :registerPattern";
    const registerPattern = `%${regno}%`;
    params.push(registerPattern);
  }
  if (ebarimt_id) {
    query += " AND EBARIMT_ID LIKE :ebarimtPattern";
    const ebarimtPattern = `%${ebarimt_id}%`;
    params.push(ebarimtPattern);
  }
  if (cust_id) {
    query += " AND CUST_ID LIKE :custPattern";
    const custPattern = `%${cust_id}%`;
    params.push(custPattern);
  }

  if (begin && end) {
    query +=
      " AND CREATED_AT BETWEEN TO_DATE(:begin, 'YYYY-MM-DD\"T\"HH24:MI:SS') AND TO_DATE(:end, 'YYYY-MM-DD\"T\"HH24:MI:SS')";
    params.push(begin, end);
  }
  if (page && limit) {
    const data = await oracle_db.queryOrder(query, params);
    totalDatas = data.length;
    const startId = (page - 1) * limit;
    query += ` ORDER BY created_at DESC OFFSET :startId ROWS FETCH NEXT :limit ROWS ONLY`;
    params.push(startId, parseInt(limit));
  }
  const data = await oracle_db.queryOrder(query, params);
  const totalPages = Math.ceil(totalDatas / limit);
  return {
    totalPages,
    totalDatas,
    currentPage: parseInt(page),
    currentPageSize: parseInt(limit),
    data,
  };
}

async function getUpdateEbarimt(req, res) {
  const { ID, STAFF_ID, ID_CHECK } = req.body;
  const params = [];
  const query =
    "UPDATE mtc_sc_ebarimt_id SET STAFF_ID = :STAFF_ID, ID_CHECK = :ID_CHECK WHERE ID = :ID";
  params.push(STAFF_ID, ID_CHECK, ID);
  const data = await oracle_db.queryOrder(query, params);
  return {
    success: true,
    data,
  };
}
async function getUpdateEditEbarimt(req, res) {
  const { STAFF_ID, CUST_ID, MOBILE, REGNO, ID } = req.body;
  const params = [];
  const query =
    "UPDATE mtc_sc_ebarimt_id SET STAFF_ID = :STAFF_ID, CUST_ID=:CUST_ID, MOBILE=:MOBILE,REGNO=:REGNO, ebarimt_id=NULL WHERE ID = :ID";
  params.push(STAFF_ID, CUST_ID, MOBILE, REGNO, ID);
  const data = await oracle_db.queryOrder(query, params);

  return {
    success: true,
    data,
  };
}

async function getAddEbarimt(req, res) {
  const { CUSTID } = req.body;
  const params = [];
  const query = `INSERT INTO mtc_sc_ebarimt_id (id, cust_id, regno, ebarimt_id, created_at, updated_at, id_check, staff_id, mobile, edit_check)
  SELECT
      MTC_SC_ebarimt_id_SEQ.nextval,
      c.cust_id,
      c.personal_id AS regno,
      NULL AS ebarimt_id,
      c.created_at,
      NULL AS updated_at,
      0 AS id_check,
      NULL AS staff_id,
      c.contact_num1 AS mobile,
      NULL AS edit_check
  FROM
      ut_sb_customer c
  WHERE
      c.cust_type = 'PSN'
      AND c.cust_id = :CUSTID
      AND c.cust_id IN (
          SELECT cust_id
          FROM ut_sb_subs
          WHERE status IN ('A', 'S', 'R')
          AND operator_id NOT IN ('MTC')
      )
      AND LENGTH(c.personal_id) = 10`;
  params.push(CUSTID);
  const data = await oracle_db.queryOrder(query, params);
  return {
    success: true,
    data,
  };
}

async function getIdEbarimt(req, res) {
  const { id } = req.query;
  const params = [];
  const query = ` 
  SELECT mtc_sc_ebarimt_id.id, mtc_sc_ebarimt_id.cust_id, ut_sb_customer.cust_name, mtc_sc_ebarimt_id.regno, mtc_sc_ebarimt_id.ebarimt_id, mtc_sc_ebarimt_id.created_at, mtc_sc_ebarimt_id.updated_at,
  mtc_sc_ebarimt_id.id_check, mtc_sc_ebarimt_id.staff_id, mtc_sc_ebarimt_id.mobile, mtc_sc_ebarimt_id.edit_check
  FROM ut_sb_customer 
  INNER JOIN mtc_sc_ebarimt_id 
  ON ut_sb_customer.CUST_ID = mtc_sc_ebarimt_id.CUST_ID 
  WHERE ID=:ID`;
  params.push(id);
  const data = await oracle_db.queryOrder(query, params);
  return {
    ...data[0],
  };
}

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

module.exports = {
  getTokenEbarimt,
  getRegUserEbarimt,
  getCusUserEbarimt,
  getSubsEbarimt,
  getAllEbarimt,
  getUpdateEbarimt,
  getUpdateEditEbarimt,
  getAddEbarimt,
  getIdEbarimt,
};
