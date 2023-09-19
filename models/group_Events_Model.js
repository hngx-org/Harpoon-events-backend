module.exports = (sequelize, Datatypes) => {
    const Group_events = sequelize.define('group_events', {
        group_id :{
            type: Datatypes.NUMERIC,  
        },
        event_id :{
            type: Datatypes.NUMERIC,  
        }
    });
  
    return Group_events;
  };
  
   // note table relation has to be implimented appriopriately