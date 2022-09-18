let successResponse = (res,msg) =>{
    let data = {
        status : 1,
        message : msg
    };
    return res.status(200).json(data);
}
let successResponseWithData = (res,msg,data) =>{

    let datas = {
        status : 1,
        message : msg,
        data : data
    };
     res.status(200).json(datas);
}
let errorResponse = (res,msg) =>{
    let data = {
        status : 0,
        message : msg
    };
    return res.status(500).json(data);
}
let notFoundResponse = (res,msg) =>{
    let data = {
        status : 0,
        message : msg
    };
    return res.status(404).json(data);

}
let authorisationErrorReponse = (res,msg) =>{
    let data = {
        status : 0,
        message : msg
    };
    return res.status(401).json(data);
    
}
let badRequestResponse = (res,mg)=>{
    let data = {
        status : 0,
        message : msg
    };
    return res.status(400).json(data);
}
let dataResponse =(res,msg)=>{
    let data = {
        status : 0,
        message : msg
    }
    return res.status(409).json(data)
}

module.exports = {
    successResponse,
    successResponseWithData,
    errorResponse,
    notFoundResponse,
    authorisationErrorReponse,
    badRequestResponse,
    dataResponse
}