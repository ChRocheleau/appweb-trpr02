import { describe, expect, it } from "vitest";
import RegisterForm from "../RegisterForm.vue";
import { mount } from "@vue/test-utils";
import GameService from "../../scripts/gameService.ts";

//DISCLAIMER: LES 3 TESTS SUIVANTS NÉCESSITENT LE BACKEND POUR PASSER
describe("RegisterForm.vue", () => {
  it("form submitted with player name and ship launches formCompleted", async () => {
    const formCompletedMock = { isLaunched: false };
    const wrapper = mount(RegisterForm, {
      propsData: {
        playerName: "John",
        playerShip: "20",
        formComplete: false,
        ships: await new GameService().getShips(),
        formCompleted: () => {
          formCompletedMock.isLaunched = true;
        },
        errorLoadingShips: false,
        isLoading: false,
      },
    });

    await wrapper.find('button[type="submit"]').trigger("click");
    expect(formCompletedMock.isLaunched).toBe(true);
  });

  it("form submitted without player name does not launches formCompleted", async () => {
    const formCompletedMock = { isLaunched: false };
    const wrapper = mount(RegisterForm, {
      propsData: {
        playerName: "",
        playerShip: "20",
        formComplete: false,
        ships: await new GameService().getShips(),
        formCompleted: () => {
          formCompletedMock.isLaunched = true;
        },
        errorLoadingShips: false,
        isLoading: false,
      },
    });

    await wrapper.find('button[type="submit"]').trigger("click");
    expect(formCompletedMock.isLaunched).toBe(false);
    expect(wrapper.emitted("formInvalid")).toBeTruthy();
  });

  it("form submitted without ship does not launches formCompleted", async () => {
    const formCompletedMock = { isLaunched: false };
    const wrapper = mount(RegisterForm, {
      propsData: {
        playerName: "John",
        playerShip: "",
        formComplete: false,
        ships: await new GameService().getShips(),
        formCompleted: () => {
          formCompletedMock.isLaunched = true;
        },
        errorLoadingShips: false,
        isLoading: false,
      },
    });

    await wrapper.find('button[type="submit"]').trigger("click");
    expect(formCompletedMock.isLaunched).toBe(false);
    expect(wrapper.emitted("formInvalid")).toBeTruthy();
  });
});
