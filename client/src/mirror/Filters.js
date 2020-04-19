const Filters = {};

Filters.Exists = () => (item) => {
  return item && typeof item !== "undefined";
};

Filters.Type = {
  Object: () => (item) => {
    return typeof item === "object";
  },
};

Filters.Has = {
  Property: (value) => (item) => {
    return (
      Filters.Exists()(item) && Filters.Exists()(item[value]) && !!item[value]
    );
  },
  String: (value) => (item) => {
    return Filters.Exists()(item) && item.toString().includes(value);
  },
};

window.Filters = Filters;

export default Filters;
