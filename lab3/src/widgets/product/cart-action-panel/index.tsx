type TCartActionsPanelProps = {
  selectedCount: number;
  totalSelectedPrice: number;
  onSelectAll: () => void;
  onRemoveSelected: () => void;
  isAllSelected: boolean;
  totalItems: number;
}

export const CartActionsPanel = ({
  selectedCount,
  totalSelectedPrice,
  onSelectAll,
  onRemoveSelected,
  isAllSelected,
  totalItems,
}: TCartActionsPanelProps) => {
  if (totalItems === 0) return null;

  return (
    <div className="max-w-5xl mx-auto mb-6">
      <div className="bg-gradient-to-r from-[#B365D4]/20 to-[#7908AA]/20 rounded-lg border-2 border-[#7908AA]/30 p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Левая часть: выбор всех и счетчик */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onSelectAll}
                className="sr-only"
                aria-label={isAllSelected ? 'Отменить выбор всех' : 'Выбрать все товары'}
              />
              <div className={`
                w-5 h-5 rounded border-2 flex items-center justify-center
                transition-all duration-200
                ${isAllSelected 
                  ? 'bg-yellow-300 border-yellow-400' 
                  : 'bg-white border-gray-300 hover:border-[#7908AA]'
                }
              `}>
                {isAllSelected && (
                  <svg 
                    className="w-3 h-3 text-[#7908AA]" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="3" 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                )}
              </div>
              <span className="ml-2 text-gray-700 font-medium">
                Выбрать все ({totalItems})
              </span>
            </label>
            
            {selectedCount > 0 && (
              <div className="bg-yellow-100 text-yellow-800 text-sm font-bold px-3 py-1 rounded-full">
                Выбрано: {selectedCount}
              </div>
            )}
          </div>

          {/* Правая часть: кнопка удаления и сумма */}
          <div className="flex items-center space-x-4">
            {selectedCount > 0 && (
              <>
                
                <button
                  onClick={onRemoveSelected}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white 
                           font-bold rounded-lg hover:from-red-600 hover:to-red-700 
                           active:scale-95 shadow-lg hover:shadow-xl transition-all duration-300
                           flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Удалить выбранное</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};