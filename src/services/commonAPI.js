import axios from "axios";

const commonAPI = async (httpMethod,url,data) => {
     return await axios({method :httpMethod,url,data}).then(res => {
        return res
    }).catch(err => {
        return err
    })
}

export default commonAPI