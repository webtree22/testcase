import { createLocalVue, mount } from "@vue/test-utils";
import Signin from "@/views/Signin.vue";
import BootstrapVue from "bootstrap-vue";
const localVue = createLocalVue();

// install plugins as normal
localVue.use(BootstrapVue);
const wrapper = mount(Signin, {
  localVue
});

describe("Signin", () => {
  describe("When Email and Password is VALID", () => {
    it("removes attribute 'disabled' from the Sign In button", async () => {
      wrapper.find("[data-emailaddress]").setValue("valid@email.com");
      wrapper.find("#password").setValue("123456");
      wrapper.find("form").trigger("submit.prevent");
      await wrapper.vm.$nextTick();
      // console.log(wrapper.html());
      const x = wrapper.find("#btnsignin").attributes().disabled;
      expect(x).toBe(undefined);
    });
  });
  describe("When Email and/Or Password is INVALID", () => {
    it("adds attribute 'disabled' to the Sign In button", async () => {
      wrapper.find("[data-emailaddress]").setValue("valid@email.com");
      wrapper.find("#password").setValue("12345");
      wrapper.find("form").trigger("submit.prevent");
      await wrapper.vm.$nextTick();
      // console.log(wrapper.html());
      const x = wrapper.find("#btnsignin").attributes().disabled;
      expect(x).toBe("disabled");
    });
  });
});
