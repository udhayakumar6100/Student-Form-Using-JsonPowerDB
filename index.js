/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jpdbBaseURL='http://api.login2explore.com:5577';
var jpdbIRL='/api/irl';
var jpdbIML='/api/iml';
var stuDBName='SCHOOL-DB';
var stuRelationName='STUDENT-TABLE';
var connToken="90932272|-31949271115691743|90954034";

$('#roolNo').focus();

function saveRecNo2LS(jsonObj)
{
    var lvData= JSON.parse(jsonObj.data);
    localStorge.setItem('recno',lvData.rec_no);
}

function getRollNoAsJsonObj()
{
    var roolNo=$('#roolNo').val();
    var jsonStr = {
        id:roolNo
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#name').val(record.name);
    $('#stuClass').val(record.stuClass);
    $('#dob').val(record.dob);
    $('#address').val(record.address);
    $('#enDate').val(record.enDate);
}

function resetForm(){
    $('#roolNo').val("");
    $('#name').val("");
    $('#stuClass').val("");
    $('#dob').val("");
    $('#address').val("");
    $('#enDate').val("");
    $('#rollNo').prop(disabled,false);
    $('#stuSave').prop(disabled,true);
    $('#stuUpdate').prop(disabled,true);
    $('#stuReset').prop(disabled,true);
    $('#rollNo').focus();
}

function validateData(){
    var roolNo,name,stuClass,dob,address,enDate;
    roolNo=$('#roolNo').val();
    name=$('#name').val();
    stuClass=$('#stuClass').val();
    dob=$('#dob').val();
    address=$('#address').val();
    enDate=$('#enDate').val();
    
    if(roolNo === ''){
        alert('STUDENT ROOL-NO MISSING');
        $('#roolNo').focus();
        return "";
    }
    if(name === ''){
        alert('STUDENT NAME MISSING');
        $('#name').focus();
        return "";
    }
    if(stuClass === ''){
        alert('STUDENT CLASS MISSING');
        $('#stuClass').focus();
        return "";
    }
    if(dob === ''){
        alert('STUDENT DOB MISSING');
        $('#dob').focus();
        return "";
    }
    if(address === ''){
        alert('STUDENT ADDRESS MISSING');
        $('#address').focus();
        return "";
    }
    if(enDate === ''){
        alert('STUDENT ENROLMENT DATE MISSING');
        $('#enDate').focus();
        return "";
    }
    
    var jsonStrObj={
        id:roolNo,
        name:name,
        stuClass:stuClass,
        dob:dob,
        address:address,
        enDate:enDate
    };
    return JSON.stringify(jsonStrObj);
}

function getStu(){
    var roolNoJsonObj = getRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,stuDBName,stuRelationName,roolNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status === 400){
        $('#stuSave').prop('disabled',false);
        $('#stuReset').prop('disabled',false);
        $('#name').focus();
    } else if(resJsonObj.status === 200){
        $('#roolNo').prop('disabled',true);
        fillData(resJsonObj);
        
        $('#stuUpdate').prop('disabled',false);
        $('#stuReset').prop('disabled',false);
        $('#name').focus();
    }
}

function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === ''){
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,stuDBName,stuRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = execteCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#roolNo').focus();
}

function updateData(){
    $('$stuUpdate').prop('disabled',true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg,stuRelationName,localStorage.getItem('recno'));
    jQuery.ajaxSetup({async:false});
    var resJsonObj = execteCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj)
    resetForm();
    $('#roolNo').focus();
}