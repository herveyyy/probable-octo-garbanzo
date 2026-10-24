import { redirect } from "next/navigation";
import { signInAction } from "@/lib/domain/actions/auth.actions";
import { getSession } from "@/lib/domain/services/auth.service";
import { AuthShell } from "@/components/organisms/AuthShell/AuthShell";
import { LabelInput } from "@/components/molecules/LabelInput/LabelInput";
import { Button } from "@/components/atoms/Button/Button";
import { getSignInFormState } from "./signInForm.hooks";
import { useAuthFormSubmitStyles } from "@/components/atoms/Button/button.hooks";

type SignInFormProps = {
  searchParams: Promise<{ error?: string; callbackURL?: string }>;
};

export async function SignInForm({ searchParams }: SignInFormProps) {
  const session = await getSession();
  const params = await searchParams;

  if (session) {
    redirect(params.callbackURL || "/");
  }

  const { callbackURL, error, fields } = getSignInFormState(params);
  const submitClassName = useAuthFormSubmitStyles();

  return (
    <AuthShell title="Sign in" description="Use your email and password to continue.">
      {error ? (
        <p className="mb-6 rounded-xl bg-secondary-container px-4 py-3 text-sm text-secondary">
          {error}
        </p>
      ) : null}

      <form action={signInAction} className="space-y-5">
        <input type="hidden" name="callbackURL" value={callbackURL} />

        {fields.map((field) => (
          <LabelInput key={field.name} {...field} />
        ))}

        <Button type="submit" className={submitClassName}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-on-surface-muted">
        No account yet?{" "}
        <a href="/sign-up" className="font-medium text-primary underline">
          Create one
        </a>
      </p>

      <div className="mt-5 pt-4 border-t border-outline-variant/30 text-center space-y-2">
        <p className="text-xs text-on-surface-muted">
          Testing the resort booking flow?
        </p>
        <a
          href="/browse"
          className="water-drop-button-secondary block w-full py-2.5 text-xs font-bold text-center"
        >
          Continue as Guest (No Login Required)
        </a>
      </div>
    </AuthShell>
  );
}
