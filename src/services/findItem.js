
const findItem = async ({ Model, email }) => {
  
    const item = await Model.findOne({email});

    return item;
};

module.exports = findItem;
