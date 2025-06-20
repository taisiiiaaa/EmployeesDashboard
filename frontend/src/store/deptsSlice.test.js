import deptsReducer, {
  addDepartment,
  deleteDepartment,
  editDepartment,
} from "./deptsSlice";

describe("Departments reducer", () => {
  it("initial state", () => {
    expect(deptsReducer(undefined, { type: "unknown" })).toEqual({
      departments: [],
    });
  });
  it("add new dept successfully", () => {
    const action = addDepartment({
      id: 4,
      name: "Development",
      manager: "James Mcgill",
      city: "Albuquergue",
      location: "st. Wolter White 32",
      num_of_employees: 670,
    });
    const state = deptsReducer({ departments: [] }, action);
    expect(state.departments.length).toBe(1);
    expect(state.departments[0].name).toBe("Development");
  });
  it("should update dept successfully", () => {
    const initialState = {
      departments: [
        {
          id: 4,
          name: "Development",
          manager: "James Mcgill",
          city: "Albuquergue",
          location: "st. Wolter White 32",
          num_of_employees: 670,
        },
      ],
    };
    const state = deptsReducer(
      initialState,
      editDepartment({
        id: 4,
        name: "Development",
        manager: "James Mcgill",
        city: "Albuquergue",
        location: "st. Wolter White 32",
        num_of_employees: 1090,
      })
    );
    expect(state.departments[0].num_of_employees).toBe(1090);
  });
  it("deletes a department", () => {
    const initialState = {
      departments: [
        {
          id: 4,
          name: "Development",
          manager: "James Mcgill",
          city: "Albuquergue",
          location: "st. Wolter White 32",
          num_of_employees: 670,
        },
      ],
    };
    const state = deptsReducer(initialState, deleteDepartment(4));
    expect(state.departments.length).toBe(0);
  });
});
