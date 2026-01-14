export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-surface-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-sm">
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Developer</h3>
            <p>Adnan Ahmed Khan</p>
            <p className="text-surface-400">Arid # 2018-ARID-0957</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Supervision</h3>
            <p>Mrs. Tayyaba</p>
            <p className="text-surface-400">Project Supervisor</p>
            <p>Mr. Umar Farooq</p>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-lg">Institution</h3>
            <p>
              Barani Institute of Information Technology (BIIT)
              <br />
              <span className="text-surface-400">
                Affiliated with PMAS Arid Agriculture University, Rawalpindi Pakistan
              </span>
            </p>
          </div>
        </div>
        <div className="border-t border-surface-700 pt-8 text-center text-sm text-surface-500">
          &copy; {new Date().getFullYear()} Kisan Diary. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
