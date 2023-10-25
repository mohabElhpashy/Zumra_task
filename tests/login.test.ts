import Input from "../components/Input.vue";
import { mount } from "@vue/test-utils";

describe("Input component tests", () => {
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

  test("Updates value on input", async () => {
    const wrapper = mount(Input, {
      props: {
        label: "Label",
        placeholder: "Placeholder",
        type: "text",
        value: "initialValue",
        error: "",
      },
    });
    const input = wrapper.find("input");
    await input.setValue("newInputValue");
    await wrapper.vm.$nextTick();
    expect(input.element.value).toBe("newInputValue");
  });

  test("Displays the label", () => {
    const label = "Custom Label";
    const wrapper = mount(Input, {
      props: {
        label,
        placeholder: "Placeholder",
        type: "text",
        value: "",
        error: "",
      },
    });
    const labelElement = wrapper.find("label");
    expect(labelElement.text()).toBe(label);
  });

  test("Displays the placeholder", () => {
    const placeholder = "Custom Placeholder";
    const wrapper = mount(Input, {
      props: {
        label: "Label",
        placeholder,
        type: "text",
        value: "",
        error: "",
      },
    });
    const input = wrapper.find("input");
    expect(input.attributes("placeholder")).toBe(placeholder);
  });

  test("Sets the input type", () => {
    const inputType = "password";
    const wrapper = mount(Input, {
      props: {
        label: "Label",
        placeholder: "Placeholder",
        type: inputType,
        value: "",
        error: "",
      },
    });
    const input = wrapper.find("input");
    expect(input.attributes("type")).toBe(inputType);
  });
});