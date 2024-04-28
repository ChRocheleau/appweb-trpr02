import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ActionsCard from "../ActionsCard.vue";

describe("ActionsCard.vue", () => {
  it("page layout is conform", async () => {
    const wrapper = mount(ActionsCard);
    const actionsP = wrapper.find("#actionsP");
    expect(actionsP.exists()).toBe(true);
    expect(actionsP.text()).toEqual("Actions");
    const fightButton = wrapper.find("#fightButton");
    expect(fightButton.exists()).toBe(true);
    expect(fightButton.text()).toEqual("Combattre");
    const endMissionButton = wrapper.find("#endMissionButton");
    expect(endMissionButton.exists()).toBe(true);
    expect(endMissionButton.text()).toEqual("Terminer la mission");
    const endMissionAndRepairButton = wrapper.find(
      "#endMissionAndRepairButton"
    );
    expect(endMissionAndRepairButton.exists()).toBe(true);
    expect(endMissionAndRepairButton.text()).toEqual(
      "Terminer la mission et réparer le vaisseau"
    );
  });
  it("fight button clicked launchs handleCombat", async () => {
    const handleCombatMock = { isLaunched: false };
    const wrapper = mount(ActionsCard, {
      propsData: {
        handleCombat: () => {
          handleCombatMock.isLaunched = true;
        },
        handleEndMission: () => {},
        handleRepair: () => {},
      },
    });

    wrapper.find("#fightButton").trigger("click");
    expect(handleCombatMock.isLaunched).toBe(true);
  });

  it("end mission button clicked launchs handleEndMission", async () => {
    const handleEndMock = { isLaunched: false };
    const wrapper = mount(ActionsCard, {
      propsData: {
        handleCombat: () => {},
        handleEndMission: () => {
          handleEndMock.isLaunched = true;
        },
        handleRepair: () => {},
      },
    });

    wrapper.find("#endMissionButton").trigger("click");
    expect(handleEndMock.isLaunched).toBe(true);
  });

  it("fight button clicked launchs handleCombat", async () => {
    const handleRepairMock = { isLaunched: false };
    const wrapper = mount(ActionsCard, {
      propsData: {
        handleCombat: () => {},
        handleEndMission: () => {},
        handleRepair: () => {
          handleRepairMock.isLaunched = true;
        },
      },
    });

    wrapper.find("#endMissionAndRepairButton").trigger("click");
    expect(handleRepairMock.isLaunched).toBe(true);
  });
});
