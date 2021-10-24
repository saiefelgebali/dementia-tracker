import supertest from "supertest";
import app from "../app";

// API Testing Agent
export const request = supertest.agent(app);
