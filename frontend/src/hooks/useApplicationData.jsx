import { useReducer, useEffect } from "react";
import axios from "axios";

export const ACTIONS = {
  GET_TOYS_BY_NAME: "GET_TOYS_BY_NAME",
  GET_TOYS_BY_AGEGROUP: "GET_TOYS_BY_AGEGROUP",
  GET_TOYS_BY_CONDITION: "GET_TOYS_BY_CONDITION"
}