import general from "../languages/en/general";
import features from "../languages/en/features";

const langData ={
    en:{
        general,
        features,
    }
};


const languages = (val)=>{
    const theLanguage = langData[localStorage.lang || "en"];
    const feature = theLanguage.features.data[val];

    return{
        ...theLanguage.general.data,
        ...feature,
    };
};

export default languages;