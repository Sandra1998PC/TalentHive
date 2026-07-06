import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { addEmployerData, getEmpData, updateEmpDetails } from "../services/APIcalls";
import Swal from "sweetalert2";

function CompanyProfile() {
  const [isExist, setExist] = useState(false)
  const { data } = useOutletContext();
  const [isExistId, setExistId] = useState()
  const [loading,setLoading] = useState(false)

  const [company, setCompany] = useState({
    empId: "",
    name: "",
    designation: "",
    companyName: "",
    logo: null,
    email: "",
    phone: "",
    address: "",
    industry: "",
    description: ""
  });

  useEffect(() => {
    if (data) {
      setCompany(prev => ({
        ...prev,
        empId: data.id,
        name: data.firstname + " " + data.lastname,
        email: data.emailid
      }));
    }
  }, [data]);

  const isDataExist = async () => {
    setLoading(true)
    const result1 = await getEmpData()
    if (result1.status === 200) {
      const resData = result1.data.filter(item => item.empId === data.id);

      if (resData.length > 0 && resData[0]) {
        setCompany(resData[0]);
        setExistId(resData[0].id);
        setExist(true);
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    isDataExist()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleFileChange = (e) => {
    setCompany({ ...company, logo: e.target.files[0] });
  };

  const storeEmpData = async () => {
    const { empId, name, designation, companyName, logo, email, phone, address, industry, description } = company
    if (empId && name && designation && companyName && email &&
      phone && address && industry && description) {

      if (!isExist) {
        setLoading(true)
        const result = await addEmployerData(company)
        if (result.status == 201) {
          Swal.fire({
            title: "Data Updated successfully",
            icon: "success"
          });
        }
        else {
          Swal.fire({
            title: "Something went wrong!!!",
            icon: "error"
          });
        }
        setLoading(false)
        setCompany({
          empId: data.id,
          name: data.firstname + " " + data.lastname,
          designation: "",
          companyName: "",
          logo: null,
          email: data.emailid,
          phone: "",
          address: "",
          industry: "",
          description: ""
        })
      }
      else {
        setLoading(true)
        const result2 = await updateEmpDetails(company, isExistId)
        if (result2.status == 200) {
          Swal.fire({
            title: "Data Updated successfully",
            icon: "success"
          });
        }
        else {
          Swal.fire({
            title: "Something went wrong!!!",
            icon: "error"
          });
        }
        setLoading(false)
        if (resData.length > 0 && resData[0]) {
          setCompany({
            empId: resData[0].empId || "",
            name: resData[0].name || "",
            designation: resData[0].designation || "",
            companyName: resData[0].companyName || "",
            logo: resData[0].logo || null,
            email: resData[0].email || "",
            phone: resData[0].phone || "",
            address: resData[0].address || "",
            industry: resData[0].industry || "",
            description: resData[0].description || ""
          });

          setExistId(resData[0].id);
          setExist(true);
        }
      }
    }
    else {
      Swal.fire({
        title: "Please fill in all required fields!!!",
        icon: "error"
      });
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    storeEmpData()
  };
  return (
    <div className="container mt-5">
      {loading ? (
                        <div className="overlayLoader">
                            <div className="d-flex justify-content-center mt-5">
                                <div className="spinner-border text-dark" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    ) : (     <div className="card shadow p-4">
        <div
          style={{
            background: "linear-gradient(90deg, #491077, #6a11cb)",
            color: "white",
            padding: "25px",
            textAlign: "center",
          }}
        >
          <h2 className="fw-bold">Employer Registration</h2>
          <p className="mb-0">Create your company profile and start hiring</p>
        </div>
        <form onSubmit={handleSubmit}>

          {/* Employer Name */}

          <div className="mb-3 mt-5">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your Name"
              value={company.name}
              onChange={handleChange}
              required={!isExist}
            />
          </div>

          <div className="mb-3">
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              className="form-control"
              placeholder="Enter your designation"
              value={company.designation}
              onChange={handleChange}
              required={!isExist}
            />
          </div>

          {/* Company Name */}
          <div className="mb-3">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              className="form-control"
              placeholder="Enter company name"
              value={company.companyName}
              onChange={handleChange}
              required={!isExist}
            />
          </div>

          {/* Logo */}
          {/* <div className="mb-3">
            <label>Company Logo</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              accept="image/*"
              required={!isExist}
            />
          </div> */}

          {/* Email */}
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={company.email}
              onChange={handleChange}
              required={!isExist}
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Enter phone number"
              value={company.phone}
              onChange={handleChange}
              required={!isExist}
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label>Address</label>
            <textarea
              name="address"
              className="form-control"
              placeholder="Enter company address"
              value={company.address}
              onChange={handleChange}
              required={!isExist}
            />
          </div>

          {/* Industry */}
          <div className="mb-3">
            <label>Industry</label>
            <input
              type="text"
              name="industry"
              className="form-control"
              placeholder="e.g. IT, Healthcare, Finance"
              value={company.industry}
              onChange={handleChange}
              required={!isExist}
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="4"
              placeholder="About the company"
              value={company.description}
              onChange={handleChange}
              required={!isExist}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn w-100" style={{
            background: "#491077",
            border: "none",
            width: "100%",
            color: "white"
          }}>
            Save Company Profile
          </button>
        </form>
      </div>)  }
 
    </div>
  )
}

export default CompanyProfile
