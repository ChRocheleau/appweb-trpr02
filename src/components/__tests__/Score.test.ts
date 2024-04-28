import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Score from "../Score.vue";

describe("Score.vue", () => {
  it("renders the component correctly", async () => {
    const wrapper = mount(Score, {
      propsData: {
        playerNameToDisplay: "",
        playerScoreToDisplay: 1,
      },
    });

    expect(wrapper.exists()).toBe(true);

    expect(wrapper.find("h5").text()).toBe("Pointage");

    const scores = wrapper.findAll("li");
    expect(scores.length).toBe(4);
    expect(scores[0].text()).toContain("NotACheater");
    expect(scores[1].text()).toContain("Barack Obama");
    expect(scores[2].text()).toContain("Maximus");
    expect(scores[3].text()).toContain("Gale");
  });

  it("when player end game, renders the component correctly", async () => {
    const wrapper = mount(Score, {
      propsData: {
        playerNameToDisplay: "John",
        playerScoreToDisplay: 1234,
      },
    });

    const scores = wrapper.findAll("li");
    expect(scores.length).toBe(5);
    expect(scores[0].text()).toContain("NotACheater");
    expect(scores[1].text()).toContain("John");
    expect(scores[2].text()).toContain("Barack Obama");
  });
});
