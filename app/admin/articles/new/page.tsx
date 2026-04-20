import AdminShell from '../../AdminShell'
import GenerateForm from './GenerateForm'

export default function NewArticlePage() {
  return (
    <AdminShell>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white">Generează articol nou</h1>
          <p className="text-white/40 text-sm mt-1">
            Gemini AI generează simultan versiunile RO, RU și EN cu context local moldovenesc.
          </p>
        </div>

        <GenerateForm />
      </div>
    </AdminShell>
  )
}
