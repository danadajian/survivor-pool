import { Field, Label, Switch } from "@headlessui/react";
import React, { Fragment, useContext } from "react";

import { SecretPickContext } from "./secret-pick-provider";

export function Toggle() {
  const { pickIsSecret, setPickIsSecret } = useContext(SecretPickContext);

  return (
    <Field className="flex flex-wrap items-center justify-center gap-3">
      <Label className="text-sm font-medium text-slate-600">
        Make pick secret
      </Label>
      <Switch checked={pickIsSecret} onChange={setPickIsSecret} as={Fragment}>
        {({ checked }) => (
          <button
            className={`${
              checked ? "bg-slate-900" : "bg-slate-200"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-out`}
          >
            <span
              className={`${
                checked ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-out`}
            />
          </button>
        )}
      </Switch>
    </Field>
  );
}
