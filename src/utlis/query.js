const defaults = require("../config/defaults");
const { generateQueryString } = require("./generateQueryString");

const getPagination = ({
  totalItems = defaults.totoalItems,
  limit = defaults.limit,
  page = defaults.page,
}) => {
  const totalPage = Math.ceil(totalItems / limit);
  const pagination = {
    page,
    limit,
    totalItems,
    totalPage,
    next: null,
    prev: null,
  };

  if (page < totalPage) {
    pagination.next = page + 1;
  }
  if (page > 1) {
    pagination.prev = page - 1;
  }

  return pagination;
};

const getHATEOASForAllItems = ({
  url = "/",
  path = "",
  query = {},
  hasNext = false,
  hasPrev = false,
  page,
}) => {
  const links = {
    self: url,
  };

  if (hasNext) {
    const queryStr = generateQueryString({ ...query, page: page - 1 });
    links.next = `${path}?${queryStr}`;
  }

  if (hasPrev) {
    const queryStr = generateQueryString({ ...query, page: page + 1 });
    links.prev = `${path}?${queryStr}`;
  }
  return links;
};

const getTransformedItems = ({ items = [], selection = [], path }) => {
  if (!Array.isArray(items) && !Array.isArray(selection)) {
    throw new Error("Invalid argument");
  }

  if (selection.length == 0) {
    return items.map((item) => ({
      ...items,
      link: `${path}/${item._id}`,
    }));
  }

  return items.map((item) => {
    const result = {};
    selection.forEach((key) => {
      result[key] = item[key];
    });
    result.link = `${path}/${item._id}`;
    return result;
  });
};

module.exports = { getPagination, getTransformedItems, getHATEOASForAllItems };
