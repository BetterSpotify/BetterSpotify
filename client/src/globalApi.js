import Util from "./util";
import { Mirror, Classes, Components, Filters } from "./mirror";
import Sidebar from "./components/Sidebar";
import Header from "./components/glue/Header";
import Registrar from "./Registrar";
const CustomSpotify = {
  Util,
  Mirror,
  Classes,
  Components,
  Filters,

  _: {
    Sidebar,
    Glue: {
      Header
    }
  },

  store: Mirror.getStore(),
  registrar: Registrar
};

window.CustomSpotify = CustomSpotify;

export default CustomSpotify;
