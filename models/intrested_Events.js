module.exports = (sequelize, Datatypes) => {
    const Intrested_events = sequelize.define('intrested_events', {
        user_id :{
            type: Datatypes.NUMERIC,  
        },
        event_id :{
            type: Datatypes.NUMERIC,  
        }
    });
  
    return Intrested_events;
  };

  // note table relation has to be implimented appriopriately
  