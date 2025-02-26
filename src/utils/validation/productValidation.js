export const productValidation = (productData) => {
    const {productName, productPrice, productModal, productDescription} = productData;
    
    let errors = {status: 'success'};

    const checkNameModelRegex =  /^[A-Za-z0-9\s_]+$/;
    const checkPrice = /^\d+(\.\d+)?$/;
    
    if(productName == "" ){
        errors.status = "failed";
        errors.productName = "Please enter name";
    }
    else if(!checkNameModelRegex.test(productName)){
        errors.status = "failed";
        errors.productName= "Please enter only alphabets";
    }

    if( productPrice == "" ){
        errors.status = "failed";
        errors.productPrice = "Please enter price";
    }
    else if(!checkPrice.test(productPrice)){
        errors.status = "failed";
        errors.productPrice = "Please enter only integer / float value";
    }

    if( productModal == ""){
        errors.status = "failed";
        errors.productModal = "Please enter modal number";
    }
    else if(!checkNameModelRegex.test(productModal)){
        errors.status = "failed";
        errors.productModal = "Please enter only alphanumeric value";
    }
    return errors;
}