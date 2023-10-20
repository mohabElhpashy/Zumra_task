import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "@/components/Input.vue";

test("Input fields work correctly", async () => {
  const wrapper = mount(Input, {
    props: {
      label: "Email address",
      placeholder: "example@mail.com",
      type: "text",
      value: "",
      error: "",
    },
  });

  const input = wrapper.find("input");

  await input.setValue("test@example.com");

  await wrapper.vm.$nextTick();

  expect(input.element.value).toBe("test@example.com");
});
