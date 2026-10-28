import React, { useState } from 'react';
import { X, Save, RotateCcw, Calendar, Edit3, Heart, Users } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function CustomizeModal({
  isOpen,
  onClose,
  data,
  onSave,
  onReset
}) {
  const [formData, setFormData] = useState({
    heading: data.heading || '',
    subtitle: data.subtitle || '',
    startDate: data.startDate?.slice(0, 10) || '2023-08-15',
    friends: JSON.parse(JSON.stringify(data.friends || []))
  });

  if (!isOpen) return null;

  const handleFriendChange = (index, field, value) => {
    const updated = [...formData.friends];
    updated[index][field] = value;
    setFormData({ ...formData, friends: updated });
  };

  const handleAddFriend = () => {
    sound.playPop();
    const newFriend = {
      id: `friend-${Date.now()}`,
      name: "New Nanban",
      role: "Partner in Mischief",
      avatar: "/memories/photo2.png",
      tag: "Bestie",
      message: "Thank you for the countless memories and laughter!"
    };
    setFormData({
      ...formData,
      friends: [...formData.friends, newFriend]
    });
  };

  const handleRemoveFriend = (index) => {
    sound.playPop();
    const updated = formData.friends.filter((_, i) => i !== index);
    setFormData({ ...formData, friends: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playChime();
    onSave({
      ...data,
      heading: formData.heading,
      subtitle: formData.subtitle,
      startDate: `${formData.startDate}T00:00:00`,
      friends: formData.friends
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-2xl w-full border border-pink-300 dark:border-purple-800 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-pink-100 dark:hover:bg-purple-900/50 text-slate-600 dark:text-purple-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-pink-600 dark:text-pink-400 font-bold text-xs uppercase tracking-wider">
          <Edit3 className="w-4 h-4" />
          <span>Personalize Everything</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white font-serif mb-6">
          Customize Website Content ⚙️💖
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hero Heading */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-purple-300 mb-1">
              Hero Heading
            </label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 dark:border-purple-800 bg-white/80 dark:bg-purple-950/60 text-slate-800 dark:text-white text-sm"
              placeholder="Bestest besttttttt Nanbanneyyyyyyyy 💗"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-purple-300 mb-1">
              Hero Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 dark:border-purple-800 bg-white/80 dark:bg-purple-950/60 text-slate-800 dark:text-white text-sm"
              placeholder="Thank you for making my life brighter, happier, and more meaningful."
            />
          </div>

          {/* Friendship Start Date */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-purple-300 mb-1">
              Friendship Start Date (Counter calculation)
            </label>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-pink-500 shrink-0" />
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-pink-200 dark:border-purple-800 bg-white/80 dark:bg-purple-950/60 text-slate-800 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Friends List */}
          <div className="pt-4 border-t border-pink-100 dark:border-purple-900/40">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs font-bold uppercase text-slate-600 dark:text-purple-300 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-pink-500" />
                <span>Friends & Custom Messages</span>
              </label>
              <button
                type="button"
                onClick={handleAddFriend}
                className="text-xs font-bold text-pink-600 hover:underline"
              >
                + Add Another Friend
              </button>
            </div>

            <div className="space-y-4">
              {formData.friends.map((friend, fIdx) => (
                <div
                  key={friend.id || fIdx}
                  className="p-4 rounded-2xl bg-white/60 dark:bg-purple-950/40 border border-pink-100 dark:border-purple-900/50 space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-500">Friend #{fIdx + 1}</span>
                    {formData.friends.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFriend(fIdx)}
                        className="text-xs text-rose-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={friend.name}
                      onChange={(e) => handleFriendChange(fIdx, 'name', e.target.value)}
                      className="px-3 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-white dark:bg-purple-900/40 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. Partner in Crime)"
                      value={friend.role}
                      onChange={(e) => handleFriendChange(fIdx, 'role', e.target.value)}
                      className="px-3 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-white dark:bg-purple-900/40 text-xs"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Heartfelt message"
                    value={friend.message}
                    onChange={(e) => handleFriendChange(fIdx, 'message', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-white dark:bg-purple-900/40 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-pink-100 dark:border-purple-900/40">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                if (confirm("Reset all customizations back to original default?")) {
                  onReset();
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 dark:text-purple-300 hover:bg-pink-100 dark:hover:bg-purple-900/40"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 dark:text-purple-200 hover:bg-pink-100 dark:hover:bg-purple-900/40"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

