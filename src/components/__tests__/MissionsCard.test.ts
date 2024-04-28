import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import MissionsCard from "../MissionsCard.vue";

describe("MissionsCard.vue", () => {
  it("page layout is conform", async () => {
    const wrapper = mount(MissionsCard);
    const currentMissionP = wrapper.find("#currentMissionP");
    expect(currentMissionP.exists()).toBe(true);
    expect(currentMissionP.text()).toEqual("Mission en cours");
    const objectiveP = wrapper.find("#objectiveP");
    expect(objectiveP.exists()).toBe(true);
    expect(objectiveP.text()).toEqual(
      "Objectif: survivre à 5 missions en obtenant le plus de crédits."
    );
  });
  it("mission counter can go 1/5", async () => {
    const wrapper = mount(MissionsCard, {
      propsData: {
        currentMission: 1,
      },
    });
    const currentMissionCounterP = wrapper.find("#currentMissionCounterP");
    expect(currentMissionCounterP.exists()).toBe(true);
    expect(currentMissionCounterP.text()).toEqual("1/5");
  });
  it("mission counter can go 2/5", async () => {
    const wrapper = mount(MissionsCard, {
      propsData: {
        currentMission: 2,
      },
    });
    const currentMissionCounterP = wrapper.find("#currentMissionCounterP");
    expect(currentMissionCounterP.exists()).toBe(true);
    expect(currentMissionCounterP.text()).toEqual("2/5");
  });
  it("mission counter can go 3/5", async () => {
    const wrapper = mount(MissionsCard, {
      propsData: {
        currentMission: 3,
      },
    });
    const currentMissionCounterP = wrapper.find("#currentMissionCounterP");
    expect(currentMissionCounterP.exists()).toBe(true);
    expect(currentMissionCounterP.text()).toEqual("3/5");
  });
  it("mission counter can go 4/5", async () => {
    const wrapper = mount(MissionsCard, {
      propsData: {
        currentMission: 4,
      },
    });
    const currentMissionCounterP = wrapper.find("#currentMissionCounterP");
    expect(currentMissionCounterP.exists()).toBe(true);
    expect(currentMissionCounterP.text()).toEqual("4/5");
  });
  it("mission counter can go 5/5", async () => {
    const wrapper = mount(MissionsCard, {
      propsData: {
        currentMission: 5,
      },
    });
    const currentMissionCounterP = wrapper.find("#currentMissionCounterP");
    expect(currentMissionCounterP.exists()).toBe(true);
    expect(currentMissionCounterP.text()).toEqual("5/5");
  });
});
