import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "../Header.vue";

describe("Header.vue", () => {
  it("emits updateScreen event with HOME_SCREEN (MainMenu) when Accueil is clicked", async () => {
    const wrapper = mount(Header);
    await wrapper.find("h5").trigger("click");
    const emittedUpdateScreen = wrapper.emitted("updateScreen");
    expect(emittedUpdateScreen![0][0]).toBe("MainMenu");
  });

  it("emits updateScreen event with SCORE_SCREEN (Score) when Score is clicked", async () => {
    const wrapper = mount(Header);
    await wrapper.findAll("h5").at(1)!.trigger("click");
    const emittedUpdateScreen = wrapper.emitted("updateScreen");
    expect(emittedUpdateScreen![0][0]).toBe("Score");
  });
});
