import SignupForm from '../ui/signup-form';

export default function Page() {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-primary/30 backdrop-blur-md shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Sign Up</h2>
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
