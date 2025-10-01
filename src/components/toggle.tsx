import { Field, Label, Switch } from "@headlessui/react";
import { Fragment, useContext } from "react";

import { SecretPickContext } from "./secret-pick-provider";

export function Toggle() {
  const { pickIsSecret, setPickIsSecret } = useContext(SecretPickContext);

  return (
    <Field className="flex items-center">
      <Label className="mr-2 font-medium">Hide your pick</Label>
      <Switch checked={pickIsSecret} onChange={setPickIsSecret} as={Fragment}>
        {({ checked }) => (
          <button
            className={`${
              checked ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                checked ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </button>
        )}
      </Switch>
    </Field>
  );
}
