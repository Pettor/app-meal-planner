import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAppSocialLinks } from "./UseAppSocialLinks";

describe("useAppSocialLinks", () => {
  let windowOpenSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    windowOpenSpy = vi.fn();
    vi.stubGlobal("window", { open: windowOpenSpy });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns onGithubClick, onLinkedInClick and onHomepageClick handlers", () => {
    const links = useAppSocialLinks("https://github.com/test", "https://linkedin.com/test", "https://home.test");
    expect(links).toHaveProperty("onGithubClick");
    expect(links).toHaveProperty("onLinkedInClick");
    expect(links).toHaveProperty("onHomepageClick");
  });

  describe("onGithubClick", () => {
    it("opens the github link in a new tab", () => {
      const { onGithubClick } = useAppSocialLinks(
        "https://github.com/test",
        "https://linkedin.com/test",
        "https://home.test"
      );
      onGithubClick();
      expect(windowOpenSpy).toHaveBeenCalledWith("https://github.com/test", "_blank", "noreferrer");
    });
  });

  describe("onHomepageClick", () => {
    it("opens the homepage link in a new tab", () => {
      const { onHomepageClick } = useAppSocialLinks(
        "https://github.com/test",
        "https://linkedin.com/test",
        "https://home.test"
      );
      onHomepageClick();
      expect(windowOpenSpy).toHaveBeenCalledWith("https://home.test", "_blank", "noreferrer");
    });
  });

  describe("onLinkedInClick", () => {
    it("opens the linkedin link in a new tab", () => {
      const { onLinkedInClick } = useAppSocialLinks(
        "https://github.com/test",
        "https://linkedin.com/test",
        "https://home.test"
      );
      onLinkedInClick();
      expect(windowOpenSpy).toHaveBeenCalledWith("https://linkedin.com/test", "_blank", "noreferrer");
    });
  });
});
