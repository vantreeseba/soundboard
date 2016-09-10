function MIDIapi() {
  this._midi = null;

  this._onCallbacks = {
    noteon: function() {},
    noteoff: function() {}
  };

  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(this._onMIDIinit.bind(this), this._onMIDIReject);
  } else {
    throw 'NO MIDI ACCESS ON THIS BROWSER!';
  }
}

MIDIapi.prototype.getInputs = function getInputs() {
  var inputs = Array.from(this._midi.inputs.values());
  return inputs;
};

MIDIapi.prototype.setInput = function(num) {
  var input = this.getInputs()[num];
  if (input) {
    input.onmidimessage = this._midiHandler.bind(this);
  } else {
    throw 'INVALID DEVICE: ' + num;
  }
};

MIDIapi.prototype.on = function(evType, callback) {
  this._onCallbacks[evType] = callback;
};

MIDIapi.prototype._onMIDIinit = function(midi) {
  this._midi = midi;
};

MIDIapi.prototype._onMIDIReject = function() {
  throw 'MIDI system failed to start.';
};

MIDIapi.prototype._midiHandler = function(event) {
  //alert(event.data);
  //Mask off the lower nibble (MIDI channel, which we don't care about)
  switch (event.data[0] & 0xf0) {
    case 0x90:
      if (event.data[2] != 0) { // if velocity != 0, this is a note-on message
        this._onCallbacks.noteon(event.data[1], event.data[2]);
        return;
      }
      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, ya'll.
    case 0x80:
      this._onCallbacks.noteoff(event.data[1]);
      return;
  }
};

module.exports = MIDIapi;
