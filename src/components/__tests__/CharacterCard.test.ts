import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CharacterCard from "../CharacterCard.vue";
import { Character } from "./../../scripts/gameService.ts";

describe("CharacterCard.vue", () => {
  it("received character and vitality are well display with info", async () => {
    const player = <Character>{
      id: "1",
      name: "John" as string,
      credit: 0,
      experience: 4,
      ship: {
        id: "1",
        name: "Vroum" as string,
        vitality: 100,
      },
    };
    const wrapper = mount(CharacterCard, {
      propsData: {
        characterToDisplay: player,
        vitalityPercentage: 100,
      },
    });
    expect(wrapper.find("#playerNameP").text()).toEqual("John");
    expect(wrapper.find("#playerShipP").text()).toEqual("Vroum");
    expect(wrapper.find("#playerShipVitalitySpan").text()).toEqual("100%");
    expect(wrapper.find("#playerExpAndCreditP").text()).toEqual(
      "Maître - 0 CG"
    );
  });
  it("received hurt character and vitality are well display with info", async () => {
    const player = <Character>{
      id: "1",
      name: "John" as string,
      credit: 60,
      experience: 4,
      ship: {
        id: "1",
        name: "WOOSH" as string,
        vitality: 60,
      },
    };
    const wrapper = mount(CharacterCard, {
      propsData: {
        characterToDisplay: player,
        vitalityPercentage: 60,
      },
    });
    expect(wrapper.find("#playerNameP").text()).toEqual("John");
    expect(wrapper.find("#playerShipP").text()).toEqual("WOOSH");
    expect(wrapper.find("#playerShipVitalitySpan").text()).toEqual("60%");
    expect(wrapper.find("#playerExpAndCreditP").text()).toEqual(
      "Maître - 60 CG"
    );
  });
});
